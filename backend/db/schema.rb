# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_12_06_152000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "instruments", force: :cascade do |t|
    t.string "label"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.bigint "track_id", null: false
    t.decimal "time"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "song_id", null: false
    t.index ["song_id"], name: "index_notes_on_song_id"
    t.index ["track_id"], name: "index_notes_on_track_id"
  end

  create_table "song_tags", force: :cascade do |t|
    t.bigint "song_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["song_id"], name: "index_song_tags_on_song_id"
    t.index ["tag_id"], name: "index_song_tags_on_tag_id"
  end

  create_table "songs", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "duration"
    t.integer "bpm"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tracks", force: :cascade do |t|
    t.bigint "song_id", null: false
    t.bigint "instrument_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["instrument_id"], name: "index_tracks_on_instrument_id"
    t.index ["song_id"], name: "index_tracks_on_song_id"
  end

  add_foreign_key "notes", "songs"
  add_foreign_key "notes", "tracks"
  add_foreign_key "song_tags", "songs"
  add_foreign_key "song_tags", "tags"
  add_foreign_key "tracks", "instruments"
  add_foreign_key "tracks", "songs"
end
