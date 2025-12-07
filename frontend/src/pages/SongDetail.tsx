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
import { useCallback, useMemo } from "react";
import { useCreateNote, useDeleteNote, useNotes } from "../hooks/useNotes";
import { useTracks } from "../hooks/useTracks";

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
  noteId: number;
  time: number;
  title: string;
  description?: string;
  color: string;
  track: number;
}

function SongDetail() {
  const { id: currentSongId } = useParams();
  const { data: songData, isLoading, isError } = useSong(currentSongId || '');
  const { data: notesData } = useNotes(currentSongId || '');
  const { data: tracksData } = useTracks(currentSongId || '');

  const { mutate: deleteNoteHandler } = useDeleteNote(currentSongId || '');
  const { mutate: createNoteHandler } = useCreateNote(currentSongId || '');

  const { duration, name, description, tags } = songData as SongDetailProps || {};
  const trackLabels = tracksData?.map(track => track.instrument?.label || 'Unknown Instrument')

  const notes = useMemo(() => mapNotesToTrackPositions(notesData || [], tracksData || []), [notesData, tracksData]);
  const timeResolution = useMemo(() => calculateTimeResolution(notes), [notes]);
  const timeLabels = useMemo(() => generateTimeLabels(duration, timeResolution), [duration, timeResolution]);
  const cells = useMemo(() => convertNotesToCells(notes, timeResolution), [notes, timeResolution]);
  const instrumentNameMapByTrackId = useMemo(() => {
    const map = new Map<string, number>();
    tracksData?.forEach((track, index) => {
      map.set(track.instrument?.label || 'Unknown Instrument', track.id); // +1 for 1-based indexing
    });
    return map;
  }, [tracksData]);


  const handleAddNoteToEmptyCell = useCallback((rowNumber: number, columnNumber: number, headerLabel?: string, sidebarLabel?: string) => {
    const selectedTrackId = instrumentNameMapByTrackId.get(headerLabel || '');
    const time = (rowNumber - 2) * timeResolution; // -2 to convert back to 0-based time index
    if (selectedTrackId !== undefined) {
      createNoteHandler({
        data: {
          time,
          trackId: selectedTrackId,
        }
      });
    }
  }, [createNoteHandler, instrumentNameMapByTrackId, timeResolution]);

  const handleDeleteNoteFromCell = useCallback((note: NotesOutputProps) => {
    const { note: noteInfo } = note;
    deleteNoteHandler({ noteId: noteInfo.noteId });
  }, [deleteNoteHandler])

  const cellClickHandler = useCallback((rowNumber: number, columnNumber: number, headerLabel?: string, sidebarLabel?: string, note?: NotesOutputProps) => {
    if (note) {
      handleDeleteNoteFromCell(note);
    } else {
      handleAddNoteToEmptyCell(rowNumber, columnNumber, headerLabel, sidebarLabel);
    }
  }, [handleAddNoteToEmptyCell, handleDeleteNoteFromCell])

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
        {trackLabels && trackLabels.length > 0 &&
          <TrackRoller
            headers={trackLabels}
            sidebarItems={timeLabels}
            cells={cells}
            onCellClick={cellClickHandler}
          />
        }
      </Layout.Content>
    </Layout>
  );
}

export default SongDetail;
