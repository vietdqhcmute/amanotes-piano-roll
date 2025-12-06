import { Layout, Card, Row, Col, Statistic } from "antd";
import TrackRoller from "../components/SongEditor/TrackRoller";
import { rockSong } from "../mocks/songs";
import { convertNotesToCells, calculateTimeResolution, generateTimeLabels } from "../utils/songsUtils";
import PageHeader from "../components/Navbar/PageHeader";

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
                value={totalDuration}
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
