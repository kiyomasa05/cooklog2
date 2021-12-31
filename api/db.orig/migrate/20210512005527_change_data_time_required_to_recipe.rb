class ChangeDataTimeRequiredToRecipe < ActiveRecord::Migration[6.1]
  def change
    change_column :recipes, :time_required, :integer
  end
end
