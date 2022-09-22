module Api
  module V1
    class FoodsController < ApplicationController
      def index
        render json: {
          foods: foods
        }, status: :ok
      end

      private

      def restaurant
        @restaurant ||= Restaurant.find(params[:restaurant_id])
      end

      def foods
        @foods ||= restaurant.foods
      end
    end
  end
end
