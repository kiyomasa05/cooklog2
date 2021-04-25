Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root 'static_pages#home'
      post 'signup', to: 'users#create'
      resources :users
      # resources :restaurants do
      #   resources :foods, only: %i[index]
      # end
      # resources :line_foods, only: %i[index create]
      # put 'line_foods/replace', to: 'line_foods#replace'
      # resources :orders, only: %i[create]
    end
  end
end
