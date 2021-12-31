module LoginHelpers
  # テストユーザーがログイン中の場合にtrueを返す
  def is_logged_in?
    !session[:user_id].nil?
  end

  def log_in(user)
    session[:user_id] = @user.id
  end
end
