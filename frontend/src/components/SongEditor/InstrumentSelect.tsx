import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Col, Row, Select, Typography } from 'antd'
import React, { useState, useCallback } from 'react'
import { useInstruments } from '../../hooks/useInstruments';
import { useCreateNote } from '../../hooks/useNotes';
import AddNoteModal from '../AddNoteModal';
import type { Instrument, Track, CreateNoteData } from '../../types/api';
import { useParams } from 'react-router-dom';
import { useCreateTrack, useDeleteTrack, useTracks } from '../../hooks/useTracks';
import { useSong } from '../../hooks/useSongs';

const InstrumentSelect: React.FC = () => {
  const { id: currentSongId } = useParams();
  const { data: songData } = useSong(currentSongId || '');

  const { mutate: createTrack } = useCreateTrack(currentSongId || '');
  const { mutate: deleteTrack } = useDeleteTrack(currentSongId || '');
  const { mutate: createNote } = useCreateNote(currentSongId || '');
  const { data: instrumentsData } = useInstruments();
  const { data: tracksData } = useTracks(currentSongId || '');

  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const selectedInstrumentIds = tracksData?.map((track: Track) => track.instrument?.id) || [];
  const instrumentOptions = instrumentsData?.map((inst: Instrument) => ({
    value: inst.id,
    label: inst.label,
    color: inst.color,
  }));

  const onAddTrackInstrument = useCallback((value: number | undefined) => {
    if (value !== undefined && currentSongId) {
      createTrack({ instrumentId: value, songId: parseInt(currentSongId) });
    }
  }, [createTrack, currentSongId]);

  const onRemoveTrackInstrument = useCallback((value: number | undefined) => {
    if (value !== undefined) {
      deleteTrack(value.toString());
    }
  }, [deleteTrack]);

  const handleAddNote = useCallback((values: CreateNoteData) => {
    if (currentSongId) {
      createNote({ data: values });
      setIsAddNoteModalOpen(false);
    }
  }, [currentSongId, createNote]);

  const handleAddNoteCancel = useCallback(() => {
    setIsAddNoteModalOpen(false);
  }, []);

  return (
    <div>
      <Typography.Text strong style={{ fontSize: '16px' }} >Instruments Used</Typography.Text>
      <Row gutter={8} style={{ marginTop: '8px', marginBottom: '16px' }}>
        <Col span={22}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            value={selectedInstrumentIds}
            options={instrumentOptions}
            onSelect={onAddTrackInstrument}
            onDeselect={onRemoveTrackInstrument}
          />
        </Col>
        <Col span={2}>
          <Button
            icon={<PlusCircleFilled />}
            type="primary"
            onClick={() => setIsAddNoteModalOpen(true)}
            disabled={!tracksData || tracksData.length === 0}
          >
            Add Note
          </Button>
        </Col>
      </Row>

      <AddNoteModal
        open={isAddNoteModalOpen}
        tracks={tracksData || []}
        songDuration={songData?.duration || 0}
        onOk={handleAddNote}
        onCancel={handleAddNoteCancel}
      />
    </div>
  )
}

export default InstrumentSelect
