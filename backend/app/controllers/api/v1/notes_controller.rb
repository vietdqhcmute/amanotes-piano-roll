class Api::V1::NotesController < ApplicationController
  before_action :set_song
  before_action :set_note, only: [:show, :destroy]

  # GET /api/v1/songs/:song_id/notes
  def index
    @notes = @song.notes.includes(track: :instrument).all
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


  # DELETE /api/v1/songs/:song_id/notes/:id
  def destroy
    @note.destroy
    render_json({ message: 'Note deleted successfully' }, status: :ok)
  end

  def create_multiple
    notes = create_multiple_params.map { |note_param| @song.notes.build(note_param) }
    if notes.all?(&:valid?)
      notes.each(&:save)
      render_json notes, status: :created
    else
      errors = notes.map.with_index do |note, index|
        { index: index, errors: note.errors.full_messages } unless note.valid?
      end.compact
      render_json({ errors: errors }, status: :unprocessable_entity)
    end
  end

  def delete_multiple
    note_ids = delete_multiple_params
    notes = @song.notes.where(id: note_ids)
    if notes.size == note_ids.size
      notes.destroy_all
      render_json({ message: 'Notes deleted successfully' }, status: :ok)
    else
      render_json({ error: 'Some notes not found' }, status: :not_found)
    end
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

  def create_multiple_params
    params.require(:notes).map do |note|
      note.permit(:time, :description, :track_id)
    end
  end

  def delete_multiple_params
    params.require(:note_ids)
  end
end
