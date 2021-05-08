require 'rails_helper'

RSpec.describe "Login", type: :request do
  describe "ログイン機能" do
      let(:params) { {user:{email: 'sample@sample.com', password: '1234'}} }
      login_url='http://localhost:3000/api/v1/login'

      before do
        post login_url,params:params
      end
    
    it 'ユーザーがログインしレスポンスをフロントへ返す' do
        expect(response).to have_http_status(:ok)
    end
      context 'ユーザーデータが見つからない場合' do
        it 'エラーメッセージを返す' do
          post login_url,params:{user:{email: '', password: '1234'}}
          # expect(response.status).to eq(401)
        end
      end
      context 'ユーザーデータが見つかった場合' do
        it 'ユーザーのパスワードが一致するかチェック' do
        end
          context 'パスワードが一致しない場合' do
            it 'エラーメッセージを返す' do
            end
          end
          context 'パスワードが一致した場合' do
            it 'ログインする' do
            end
            it 'ログイン情報をフロントへ返す' do
              post login_url,params:{user:{email: 'sample@sample.com', password: '1234'}}
              json = JSON.parse(response.body)
              # expect(json["name"]).to eq @user.name
              # expect(json["email"]).to eq @user.email
              # expect(json["logged_in"]).to truty
              # expect(!session[:user_id].nil?).to be_truthy

            end
          end
      end
      
    
  end
end
