module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :ordered_food, only: %i[create update]

      def index
        line_foods = LineFood.active

        if line_foods.exists?
          render json: {
            line_food_ids: line_foods.map { |line_food| line_food.id },
            retaurant: line_foods.first.restaurant,
            count: line_foods.sum{ |line_food| line_food[:count] },
            # total_amount = food.price * count
            amount: line_foods.sum { |line_food| line_food.toral_amount }
          },status: :ok
        else
          render json: {},status: :no_content
        end
      end

      def create
        # If you already have a provisional order at another store
        if LineFood.active.other_restaurant(ordered_food.restaurant.id).exists?
          return render json: {
            existing_restaurant: LineFood.other_restaurant(ordered_food.restaurant.id).first.restaurant.name,
            new_restaurant: Food.find(params[:food_id]).restaurant.name,
          },status: :not_acceptable
        end

        set_line_food(ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          },status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      def replace
        LineFood.active.other_restaurant(ordered_food.restaurant.id).each do |line_food|
          line_food.update_attribute(:actice, false)
        end

        set_line_food(ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          },status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def ordered_food
        @ordered_food ||= Food.find(params[:food_id])
      end

      def set_line_food(ordered_food)
        # If same foods exists
        if ordered_food.line_food.present?
          @line_food ||= ordered_food.line_food
          # attributes = Can get the attributes
          @line_food.attributes = {
            count: ordered_food.line_food.count + params[:count],
            active: true
          }
        else
          @line_food = ordered_food.build_line_food(
            count: params[:count],
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end
    end
  end
end
