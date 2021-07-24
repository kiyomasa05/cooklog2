Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root 'static_pages#home'
      post '/signup', to: 'users#create'
      patch '/edit', to: 'users#update'

      post '/login',to:'sessions#create'
      get '/logged_in', to: 'sessions#logged_in?'
      delete '/logout',to:'sessions#logout'
      
      resources :users 
      resources :recipes
      
    end
  end
end
