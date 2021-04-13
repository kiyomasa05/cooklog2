class StaticPagesController < ApplicationController
  def home
    render json: {
    }, status: :ok
  end
end
