class CreateInstruments < ActiveRecord::Migration[7.2]
  def change
    create_table :instruments do |t|
      t.string :label
      t.string :color

      t.timestamps
    end
  end
end
