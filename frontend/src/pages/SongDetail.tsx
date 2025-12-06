import TrackRoller from "../components/SongEditor/TrackRoller";
import { rockSong } from "../mocks/songs";
import { convertNotesToCells, calculateTimeResolution, generateTimeLabels } from "../utils/songsUtils";

interface SongDetailProps {
  name: string;
  description: string;
  totalDuration: number;
  trackLabels: string[];
  notes: NotesProps[];
}
export interface NotesProps {
  track: number;
  time: number;
  title: string;
  description?: string;
  color: string;
}

function SongDetail() {
  const mockSong: SongDetailProps = rockSong;
  const { name, description, totalDuration, trackLabels, notes } = mockSong;

  const timeResolution = calculateTimeResolution(notes);
  const timeLabels = generateTimeLabels(totalDuration, timeResolution);
  const cells = convertNotesToCells(notes, timeResolution);

  return (
    <div>
      <h1>Song Detail</h1>
      <p>View song details here</p>
      <TrackRoller
        headers={trackLabels}
        sidebarItems={timeLabels}
        cells={cells}
      />
    </div>
  );
}

export default SongDetail;
