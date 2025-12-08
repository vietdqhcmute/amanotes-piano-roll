class Api::V1::TracksController < ApplicationController
  before_action :set_song
  before_action :set_track, only: [:show, :destroy]

  def index
    @tracks = @song.tracks.includes(:instrument).all
    render_json @tracks.as_json(
      include: {
        instrument: { only: [:id, :label, :color] }
      }
    )
  end

  def show
    render_json @track.as_json(
      include: {
        instrument: { only: [:id, :label, :color] }
      }
    )
  end

  def create
    @track = @song.tracks.build(track_params)
    if @track.save
      render_json @track.as_json(
        include: {
          instrument: { only: [:id, :label, :color] }
        }
      ), status: :created
    else
      render_json({ errors: @track.errors.full_messages }, status: :unprocessable_entity)
    end
  end

  def destroy
    @track.destroy
    render_json({ message: 'Note deleted successfully' }, status: :ok)
  end

  private

  def set_song
    @song = Song.find(params[:song_id])
  rescue ActiveRecord::RecordNotFound
    render_json({ error: 'Song not found' }, status: :not_found)
  end

  def set_track
    @track = @song.tracks.find_by(instrument_id: params[:id])
  rescue ActiveRecord::RecordNotFound
    render_json({ error: 'Track not found' }, status: :not_found)
  end

  def track_params
    params.require(:track).permit(:id, :song_id, :instrument_id)
  end
end
