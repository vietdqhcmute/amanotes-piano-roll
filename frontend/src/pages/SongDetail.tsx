import { Layout, Card, Row, Col, Statistic, Button } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import TrackRoller from '../components/SongEditor/TrackRoller';
import {
  convertNotesToCells,
  calculateTimeResolution,
  generateTimeLabels,
  mapNotesToTrackPositions,
} from '../utils/songsUtils';
import PageHeader from '../components/Navbar/PageHeader';
import { useParams } from 'react-router-dom';
import { useSong } from '../hooks/useSongs';
import TagList from '../components/SongEditor/TagList';
import { colors } from '../utils/constants';
import InstrumentSelect from '../components/SongEditor/InstrumentSelect';
import PianoRollTour from '../components/PianoRollTour';
import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { useCreateMultipleNotes, useDeleteMultipleNotes, useNotes } from '../hooks/useNotes';
import { useTracks } from '../hooks/useTracks';
import { useNoteEditStore } from '../stores/noteEditStore';
import { deduplicatePendingNotes } from '../utils/noteUtils';

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
  const { data: songData } = useSong(currentSongId || '');
  const { data: notesData } = useNotes(currentSongId || '');
  const { data: tracksData } = useTracks(currentSongId || '');

  // Tour state and refs
  const [tourOpen, setTourOpen] = useState(false);
  const instrumentSelectRef = useRef<HTMLDivElement>(null);
  const addNoteButtonRef = useRef<HTMLButtonElement>(null);
  const trackRollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem('pianoRollTourCompleted');
    if (!hasSeenTour) {
      // Delay tour start to ensure components are rendered
      const timer = setTimeout(() => {
        setTourOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleTourClose = useCallback(() => {
    setTourOpen(false);
    localStorage.setItem('pianoRollTourCompleted', 'true');
  }, []);

  const handleTourOpen = useCallback(() => {
    setTourOpen(true);
  }, []);

  const duration = songData?.duration || 0;
  const name = songData?.name || '';
  const description = songData?.description || '';
  const tags = songData?.tags || [];
  const trackLabels = tracksData?.map(track => track.instrument?.label || 'Unknown Instrument');
  const trackColors = tracksData?.map(track => track.instrument?.color || '#000000');

  const notes = useMemo(
    () => mapNotesToTrackPositions(notesData || [], tracksData || []),
    [notesData, tracksData]
  );
  const timeResolution = useMemo(() => calculateTimeResolution(notes), [notes]);
  const timeLabels = useMemo(
    () => generateTimeLabels(duration, timeResolution),
    [duration, timeResolution]
  );
  const cells = useMemo(() => convertNotesToCells(notes, timeResolution), [notes, timeResolution]);
  const instrumentNameMapByTrackId = useMemo(() => {
    const map = new Map<string, number>();
    tracksData?.forEach(track => {
      map.set(track.instrument?.label || 'Unknown Instrument', track.id); // +1 for 1-based indexing
    });
    return map;
  }, [tracksData]);

  const { pendingAddedNotes, pendingDeletedNotes } = useNoteEditStore();
  const { mutate: createMultipleNotes, isLoading: isCreatingMultiple } = useCreateMultipleNotes(currentSongId || '');
  const { mutate: deleteMultipleNotes, isLoading: isDeletingMultiple } = useDeleteMultipleNotes(currentSongId || ''); // Reusing useDeleteNote for multiple deletions

  const handleSubmitUpdateNotes = () => {
    const { dedupedAddedNotes, dedupedDeletedNotes } = deduplicatePendingNotes(
      pendingAddedNotes,
      pendingDeletedNotes
    );
    const addNoteRequestData = dedupedAddedNotes.map(note => ({
      time: note.note.time.split('s')[0],
      trackId: instrumentNameMapByTrackId.get(note.content.title || ''),
    }));

    const deleteNoteIds = dedupedDeletedNotes
      .map(note => note.note.noteId)
      .filter((id): id is number => id !== undefined)
      .map(id => id.toString());

    if (addNoteRequestData.length > 0) {
      createMultipleNotes({ data: addNoteRequestData });
    }
    if (deleteNoteIds.length > 0) {
      deleteMultipleNotes({ noteIds: deleteNoteIds });
    }
  };

  const handleDebouncedSubmit = useDebouncedCallback(() => {
    console.log('Auto-saving changes...');
    handleSubmitUpdateNotes();
  }, 1000);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader title='Song Detail' backLink='/song-dashboard' />
      <Layout.Content style={{ padding: '24px' }}>
        <Card style={{ marginBottom: '16px' }}>
          <Row gutter={24}>
            <Col span={18}>
              <div>
                <Statistic
                  title='Song Name'
                  value={name}
                  valueStyle={{ color: colors.colorPrimary, fontSize: '18px', marginBottom: '8px' }}
                />
                <Statistic
                  title='Description'
                  value={description}
                  valueStyle={{ color: colors.colorPrimary, fontSize: '14px' }}
                />
                <TagList tags={tags || []} />
              </div>
            </Col>
            <Col span={6}>
              <Statistic
                title='Duration'
                value={duration}
                suffix='seconds'
                valueStyle={{ color: colors.colorError }}
              />
              <Statistic
                title='BPM'
                value={songData?.bpm || 0}
                suffix='bpm'
                valueStyle={{ color: colors.colorError }}
              />
            </Col>
          </Row>
        </Card>
        <div ref={instrumentSelectRef}>
          <InstrumentSelect ref={addNoteButtonRef} />
        </div>
        {trackLabels && trackLabels.length > 0 && (
          <div ref={trackRollerRef}>
            <TrackRoller
              headers={trackLabels}
              headerColors={trackColors}
              sidebarItems={timeLabels}
              cells={cells}
              onCellClick={handleDebouncedSubmit}
            />
          </div>
        )}

        <PianoRollTour
          tourOpen={tourOpen}
          onTourClose={handleTourClose}
          onTourOpen={handleTourOpen}
          onTourFinish={handleTourClose}
          instrumentSelectRef={instrumentSelectRef}
          addNoteButtonRef={addNoteButtonRef}
          trackRollerRef={trackRollerRef}
        />
      </Layout.Content>
    </Layout>
  );
}

export default SongDetail;
