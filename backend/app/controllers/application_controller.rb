class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  protected

  def render_json(data, status: :ok)
    render json: camelize_keys(data), status: status
  end

  private

  def camelize_keys(data)
    case data
    when Array
      data.map { |item| camelize_keys(item) }
    when Hash
      data.deep_transform_keys { |key| key.to_s.camelize(:lower) }
    else
      data
    end
  end
end
