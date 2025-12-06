class Api::V1::NotesController < ApplicationController
  before_action :set_song
  before_action :set_note, only: [:show, :update, :destroy]

  # GET /api/v1/songs/:song_id/notes
  def index
    @notes = @song.notes.includes(:track).all
    render_json @notes.as_json(
      include: {
        track: { only: [:id], include: { instrument: { only: [:id, :label] } } }
      }
    )
  end

  # GET /api/v1/songs/:song_id/notes/:id
  def show
    render_json @note.as_json(
      include: {
        track: { only: [:id], include: { instrument: { only: [:id, :label] } } }
      }
    )
  end

  # POST /api/v1/songs/:song_id/notes
  def create
    @note = @song.notes.build(note_params)

    if @note.save
      render_json @note, status: :created
    else
      render_json({ errors: @note.errors }, status: :unprocessable_entity)
    end
  end

  # PATCH/PUT /api/v1/songs/:song_id/notes/:id
  def update
    if @note.update(note_params)
      render_json @note
    else
      render_json({ errors: @note.errors }, status: :unprocessable_entity)
    end
  end

  # DELETE /api/v1/songs/:song_id/notes/:id
  def destroy
    @note.destroy
    head :no_content
  end

  private

  def set_song
    @song = Song.find(params[:song_id])
  rescue ActiveRecord::RecordNotFound
    render_json({ error: 'Song not found' }, status: :not_found)
  end

  def set_note
    @note = @song.notes.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_json({ error: 'Note not found' }, status: :not_found)
  end

  def note_params
    params.require(:note).permit(:time, :description, :track_id)
  end
end
