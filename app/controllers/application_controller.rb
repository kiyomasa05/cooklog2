class ApplicationController < ActionController::API
  include ActionController::Helpers
  before_action :fake_load
  skip_before_action :verify_authenticity_token, raise: false
  # Railsが認証トークンを使用しないように

  helper_method :login!, :current_user

  def login!
    session[:user_id] = @user.id
  end

  # 一時cookiesは自動的に暗号化

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    #session[:user_id]が入っていない。
    #@current_useがnilだからおかしくなっている。
  end

  def fake_load
    sleep(1)
    # 1秒だけプログラムの実行を止める
  end
end
