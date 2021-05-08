require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { FactoryBot.create(:user) }
    it "名前、e-mail、パスワードがあれば登録" do
      expect(FactoryBot.create(:user)).to be_valid
    end

    it "nameが空のエラーチェック" do
      expect(FactoryBot.build(:user,name:"")).to_not be_valid
    end

    it "emailが空のエラーチェック" do
      expect(FactoryBot.build(:user,email:"")).to_not be_valid
    end

    it "メアドが重複してたら登録できない" do
      user1=FactoryBot.create(:user,name:"sample1",email:"sample@sample.com")
      expect(FactoryBot.build(:user,name:"sample1",email:"user1.email")).to_not be_valid
    end

    it "パスワードがなければ登録できない" do
      expect(FactoryBot.build(:user,password:"")).to_not be_valid
    end

    it "パスワードが暗号化されているか" do
      user=FactoryBot.create(:user)
      expect(user.password_digest).to_not eq "password"
    end

    it "確認用のパスワードが一致しなかったら保存しない" do
      expect(FactoryBot.build(:user,password:"password",password_confirmation:"passward")).to_not be_valid
    end
end
