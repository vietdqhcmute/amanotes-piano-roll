# Clear existing data
Note.destroy_all
Track.destroy_all
SongTag.destroy_all
Tag.destroy_all
Song.destroy_all
Instrument.destroy_all

puts "Clearing database..."

# ========================================
# Create 10 Popular MIDI Instruments
# ========================================
puts "Creating instruments..."

instruments = [
  { label: "Kick Drum", color: "#EF4444" },
  { label: "Snare Drum", color: "#3B82F6" },
  { label: "Hi-Hat", color: "#10B981" },
  { label: "Crash Cymbal", color: "#F59E0B" },
  { label: "Ride Cymbal", color: "#8B5CF6" },
  { label: "Bass Guitar", color: "#EC4899" },
  { label: "Lead Synth", color: "#06B6D4" },
  { label: "Pad Synth", color: "#84CC16" },
  { label: "Electric Piano", color: "#F97316" },
  { label: "808 Bass", color: "#14B8A6" }
]

created_instruments = instruments.map do |inst|
  Instrument.create!(inst)
end

puts "✓ Created #{Instrument.count} instruments"

# ========================================
# Create 10 Popular Music Genre Tags (2025)
# ========================================
puts "Creating genre tags..."

genres = [
  "Hyperpop",
  "Phonk",
  "Afrobeats",
  "Lo-fi Hip Hop",
  "Drill",
  "Synthwave",
  "Bedroom Pop",
  "Trap",
  "House",
  "Indie Electronic"
]

created_tags = genres.map do |genre|
  Tag.create!(label: genre)
end

puts "✓ Created #{Tag.count} genre tags"

# ========================================
# Create First Song: "Midnight Drive"
# ========================================
puts "Creating song..."

song = Song.create!(
  name: "Midnight Drive",
  description: "A synthwave-inspired track with driving bassline and atmospheric pads",
  duration: 180,  # 3 minutes
  bpm: 110,
  genre: "Synthwave"
)

# Add tags to song
song.tags << [
  Tag.find_by(label: "Synthwave"),
  Tag.find_by(label: "Indie Electronic"),
  Tag.find_by(label: "Lo-fi Hip Hop")
]

puts "✓ Created song: #{song.name}"

# ========================================
# Create Tracks for the Song
# ========================================
puts "Creating tracks..."

# Track 1: Kick Drum
kick_track = song.tracks.create!(
  instrument: Instrument.find_by(label: "Kick Drum")
)

# Track 2: Snare Drum
snare_track = song.tracks.create!(
  instrument: Instrument.find_by(label: "Snare Drum")
)

# Track 3: Hi-Hat
hihat_track = song.tracks.create!(
  instrument: Instrument.find_by(label: "Hi-Hat")
)

# Track 4: Bass Guitar
bass_track = song.tracks.create!(
  instrument: Instrument.find_by(label: "Bass Guitar")
)

# Track 5: Lead Synth
lead_track = song.tracks.create!(
  instrument: Instrument.find_by(label: "Lead Synth")
)

# Track 6: Pad Synth
pad_track = song.tracks.create!(
  instrument: Instrument.find_by(label: "Pad Synth")
)

puts "✓ Created #{song.tracks.count} tracks"

# ========================================
# Create Notes for Each Track (4-bar pattern)
# ========================================
puts "Creating notes..."

# Kick pattern (every beat)
[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5].each do |time|
  kick_track.notes.create!(
    song: song,
    time: time,
    description: "Kick hit"
  )
end

# Snare pattern (on 2 and 4)
[1, 3].each do |time|
  snare_track.notes.create!(
    song: song,
    time: time,
    description: "Snare backbeat"
  )
end

# Hi-Hat pattern (eighth notes)
[0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75].each do |time|
  hihat_track.notes.create!(
    song: song,
    time: time,
    description: "Hi-hat rhythm"
  )
end

# Bass pattern (simple groove)
[0, 0.75, 1.5, 2, 2.75, 3.5].each do |time|
  bass_track.notes.create!(
    song: song,
    time: time,
    description: "Bass note"
  )
end

# Lead synth melody
[0, 0.5, 1, 1.5, 2.5, 3].each do |time|
  lead_track.notes.create!(
    song: song,
    time: time,
    description: "Lead melody note"
  )
end

# Pad (sustained chords)
[0, 2].each do |time|
  pad_track.notes.create!(
    song: song,
    time: time,
    description: "Pad chord"
  )
end

puts "✓ Created #{Note.count} notes"

# ========================================
# Summary
# ========================================
puts "\n" + "="*50
puts "SEED DATA SUMMARY"
puts "="*50
puts "Instruments: #{Instrument.count}"
puts "  - #{Instrument.pluck(:label).join(', ')}"
puts "\nGenre Tags: #{Tag.count}"
puts "  - #{Tag.pluck(:label).join(', ')}"
puts "\nSongs: #{Song.count}"
puts "  - #{song.name} (#{song.bpm} BPM, #{song.duration}s)"
puts "  - Genres: #{song.tags.pluck(:label).join(', ')}"
puts "  - Tracks: #{song.tracks.count}"
puts "  - Notes: #{song.notes.count}"
puts "="*50

# Test queries
puts "\nSeeding completed successfully!"
