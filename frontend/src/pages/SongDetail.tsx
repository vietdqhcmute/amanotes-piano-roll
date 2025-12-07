import { Layout, Card, Row, Col, Statistic } from "antd";
import TrackRoller from "../components/SongEditor/TrackRoller";
import { convertNotesToCells, calculateTimeResolution, generateTimeLabels, mapNotesToTrackPositions } from "../utils/songsUtils";
import PageHeader from "../components/Navbar/PageHeader";
import { useParams } from "react-router-dom";
import { useSong } from "../hooks/useSongs";
import type { Note, Tag as TagType, Track } from "../types/api";
import TagList from "../components/SongEditor/TagList";
import { colors } from "../utils/constants";
import InstrumentSelect from "../components/SongEditor/InstrumentSelect";
import { useMemo } from "react";


interface SongDetailProps {
  name: string;
  description: string;
  duration: number;
  trackLabels: string[];
  notes: Note[];
  tracks: Track[];
  tags: TagType[]
}
export interface NotesOutputProps {
  time: number;
  title: string;
  description?: string;
  color: string;
}

function SongDetail() {
  const { id: currentSongId } = useParams();
  const { data: songData, isLoading, isError } = useSong(currentSongId || '');
  const { tracks, notes: notesRes, duration, name, description, tags } = songData as SongDetailProps || {};
  const trackLabels = tracks?.map(track => track.instrument?.label || 'Unknown Instrument')

  const notes = useMemo(() => mapNotesToTrackPositions(notesRes || [], tracks || []), [notesRes, tracks]);
  const timeResolution = useMemo(() => calculateTimeResolution(notes), [notes]);
  const timeLabels = useMemo(() => generateTimeLabels(duration, timeResolution), [duration, timeResolution]);
  const cells = useMemo(() => convertNotesToCells(notes, timeResolution), [notes, timeResolution]);

  const cellClickHandler = (rowNumber: number, columnNumber: number) => {
    console.log(`Cell clicked at row: ${rowNumber}s, col: ${columnNumber}`);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader title="Song Detail" backLink="/song-dashboard" />
      <Layout.Content style={{ padding: '24px' }}>
        <Card style={{ marginBottom: '16px' }}>
          <Row gutter={24}>
            <Col span={18}>
              <div>
                <Statistic
                  title="Song Name"
                  value={name}
                  valueStyle={{ color: colors.colorPrimary, fontSize: '18px', marginBottom: '8px' }}
                />
                <Statistic
                  title="Description"
                  value={description}
                  valueStyle={{ color: colors.colorPrimary, fontSize: '14px' }}
                />
                <TagList tags={tags || []} />
              </div>
            </Col>
            <Col span={6}>
              <Statistic
                title="Duration"
                value={duration}
                suffix="seconds"
                valueStyle={{ color: colors.colorError }}
              />
            </Col>
          </Row>
        </Card>
        <InstrumentSelect />
        <TrackRoller
          headers={trackLabels}
          sidebarItems={timeLabels}
          cells={cells}
          onCellClick={cellClickHandler}
        />
      </Layout.Content>
    </Layout>
  );
}

export default SongDetail;
