# module = Specify the namespace
module Api
  module V1
    class RestaurantsController < ApplicationController
      def index
        render json: {
          restaurant: restaurant
        }, status: :ok
      end

      private

      def restaurant
        @restaurant ||= Restaurant.all
      end
    end
  end
end
