require 'rails_helper'

RSpec.describe "Index", type: :request do
  describe "レシピ一覧" do
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

      
  end
end
