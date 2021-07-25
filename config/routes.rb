Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root "static_pages#home"
      post "/signup", to: "users#create"

      post "/login", to: "sessions#create"
      get "/logged_in", to: "sessions#logged_in?"
      delete "/logout", to: "sessions#logout"

      resources :users do
        get :favorites, on: :collection
      end
      resources :recipes do
        resource :favorites, only: [:create, :destroy]
      end
    end
  end
end
