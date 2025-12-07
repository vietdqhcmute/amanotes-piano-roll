class Api::V1::InstrumentsController < ApplicationController
  def index
    instruments = Instrument.all
    render_json(instruments)
  end
end
