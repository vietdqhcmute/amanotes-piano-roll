class Api::V1::SongsController < ApplicationController
  before_action :set_song, only: [:show, :update, :destroy]

  # GET /api/v1/songs
  def index
    @songs = Song.includes(:tags).all
    render json: @songs.as_json(
      include: {
        tags: { only: [:id, :label] }
      }
    )
  end

  # GET /api/v1/songs/:id
  def show
    render json: @song.as_json(
      include: {
        tags: { only: [:id, :label] },
        tracks: {
          only: [:id, :instrument_id],
          include: {
            instrument: { only: [:id, :label] },
            notes: { only: [:id, :time, :description] }
          }
        },
        notes: { only: [:id, :time, :description, :track_id] }
      }
    )
  end

  # POST /api/v1/songs
  def create
    @song = Song.new(song_params)

    if @song.save
      render json: @song, status: :created
    else
      render json: { errors: @song.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/songs/:id
  def update
    if @song.update(song_params)
      render json: @song
    else
      render json: { errors: @song.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/songs/:id
  def destroy
    @song.destroy
    head :no_content
  end

  private

  def set_song
    @song = Song.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Song not found' }, status: :not_found
  end

  def song_params
    params.require(:song).permit(:name, :description, :bpm, :duration, tag_ids: [])
  end
end
