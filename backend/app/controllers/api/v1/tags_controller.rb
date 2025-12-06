class Api::V1::TagsController < ApplicationController
  before_action :set_tag, only: [:show, :update, :destroy]

  # GET /api/v1/tags
  def index
    @tags = Tag.all
    render_json @tags.as_json(only: [:id, :label, :created_at, :updated_at])
  end

  # GET /api/v1/tags/:id
  def show
    render_json @tag.as_json(
      only: [:id, :label, :created_at, :updated_at],
      include: {
        songs: { only: [:id, :name, :description, :bpm, :duration] }
      }
    )
  end

  # POST /api/v1/tags
  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render_json @tag, status: :created
    else
      render_json({ errors: @tag.errors }, status: :unprocessable_entity)
    end
  end

  # PATCH/PUT /api/v1/tags/:id
  def update
    if @tag.update(tag_params)
      render_json @tag
    else
      render_json({ errors: @tag.errors }, status: :unprocessable_entity)
    end
  end

  # DELETE /api/v1/tags/:id
  def destroy
    @tag.destroy
    head :no_content
  end

  private

  def set_tag
    @tag = Tag.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_json({ error: 'Tag not found' }, status: :not_found)
  end

  def tag_params
    params.require(:tag).permit(:label)
  end
end
