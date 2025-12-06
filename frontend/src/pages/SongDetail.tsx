import { Layout, Card, Row, Col, Statistic } from "antd";
import TrackRoller from "../components/SongEditor/TrackRoller";
import { convertNotesToCells, calculateTimeResolution, generateTimeLabels, mapNotesToTrackPositions } from "../utils/songsUtils";
import PageHeader from "../components/Navbar/PageHeader";
import { useParams } from "react-router-dom";
import { useSong } from "../hooks/useSongs";
import type { Note, Track } from "../types/api";


interface SongDetailProps {
  name: string;
  description: string;
  duration: number;
  trackLabels: string[];
  notes: Note[];
  tracks: Track[];
}
export interface NotesOutputProps {
  time: number;
  title: string;
  description?: string;
  color: string;
}

function SongDetail() {
  const { id } = useParams();
  const { data: songData, isLoading, isError } = useSong(id || '');
  const { tracks, notes: songNotes, duration, name, description } = songData as SongDetailProps || {};
  const notes = mapNotesToTrackPositions(songNotes || [], tracks || []);
  const trackLabels = tracks?.map(track => track.instrument?.label || 'Unknown Instrument')

  const timeResolution = calculateTimeResolution(notes);
  const timeLabels = generateTimeLabels(duration, timeResolution);
  const cells = convertNotesToCells(notes, timeResolution);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader title="Song Detail" backLink="/song-dashboard" />
      <Layout.Content style={{ padding: '24px' }}>
        <Card style={{ marginBottom: '24px' }}>
          <Row gutter={24}>
            <Col span={18}>
              <div>
                <Statistic
                  title="Song Name"
                  value={name}
                  valueStyle={{ color: '#A81DB6', fontSize: '18px', marginBottom: '8px' }}
                />
                <Statistic
                  title="Description"
                  value={description}
                  valueStyle={{ color: '#9307BD', fontSize: '14px' }}
                />
              </div>
            </Col>
            <Col span={6}>
              <Statistic
                title="Duration"
                value={duration}
                suffix="seconds"
                valueStyle={{ color: '#E92384' }}
              />
            </Col>
          </Row>
        </Card>

        <TrackRoller
          headers={trackLabels}
          sidebarItems={timeLabels}
          cells={cells}
        />
      </Layout.Content>
    </Layout>
  );
}

export default SongDetail;
