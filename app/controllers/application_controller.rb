class ApplicationController < ActionController::API

  
  # skip_before_action :verify_authenticity_token
  # Railsが認証トークンを使用しないように

  # helper_method :login!, :current_user

  def login!
      session[:user_id] = @user.id
  end
  # 一時cookiesは自動的に暗号化

  def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
