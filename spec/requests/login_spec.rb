require 'rails_helper'

RSpec.describe "Login", type: :request do
  describe "ログイン機能" do
    before do
      @user = create(:user)
    end

      login_url='http://localhost:3000/api/v1/login'

      context 'ユーザーデータが見つからない場合' do
        it 'エラーメッセージを返す' do
          post login_url,params:{user:{email: 'sample@sample.com', password: '1234'}}
          expect(json['errors']).to eq(['認証に失敗しました。', '正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。'])
          expect(json['status']).to eq(401)
        end
      end

      context '正しい情報でユーザーが見つかった場合' do
        before do
          post login_url,params:{user:{email: @user.email, password: @user.password}}
          log_in(@user)
        end
            it 'OKステータスを返す' do
              expect(response).to have_http_status(:ok)
            end
            it 'ログイン情報をフロントへ返す' do
              expect(json["user"]["name"]).to eq @user.name
              expect(json["user"]["email"]).to eq @user.email
              expect(json["logged_in"]).to be_truthy
            end
            it 'ログインする' do
              expect(is_logged_in?).to be true
            end
      end
  end
end
