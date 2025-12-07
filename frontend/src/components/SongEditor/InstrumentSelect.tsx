import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Col, Row, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { useInstruments } from '../../hooks/useInstruments';
import { useCreateNote } from '../../hooks/useNotes';
import AddNoteModal from '../AddNoteModal';
import type { Instrument, Track, CreateNoteData } from '../../types/api';
import { useParams } from 'react-router-dom';
import { useCreateTrack, useDeleteTrack } from '../../hooks/useTracks';
import { useSong } from '../../hooks/useSongs';

const InstrumentSelect: React.FC = () => {
  const { id: currentSongId } = useParams();
  const { data: songData } = useSong(currentSongId || '');
  const { tracks } = songData || {};
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const selectedInstrumentIds = tracks?.map((track: Track) => track.instrument?.id) || [];
  const { mutate: createTrack } = useCreateTrack(currentSongId || '');
  const { mutate: deleteTrack } = useDeleteTrack(currentSongId || '');
  const { mutate: createNote } = useCreateNote(currentSongId || '');
  const { data: instrumentsData } = useInstruments();
  const instrumentOptions = instrumentsData && instrumentsData.map((inst: Instrument) => ({
    value: inst.id,
    label: inst.label,
    color: inst.color,
  }));

  const onAddTrackInstrument = (value: string) => {
    createTrack({ instrumentId: value });
  }

  const onRemoveTrackInstrument = (value: string) => {
    deleteTrack({ instrumentId: value });
  }

  const handleAddNote = (values: CreateNoteData) => {
    if (currentSongId) {
      createNote({ data: values });
      setIsAddNoteModalOpen(false);
    }
  };

  const handleAddNoteCancel = () => {
    setIsAddNoteModalOpen(false);
  };

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
            disabled={!tracks || tracks.length === 0}
          >
            Add Note
          </Button>
        </Col>
      </Row>

      <AddNoteModal
        open={isAddNoteModalOpen}
        tracks={tracks || []}
        songDuration={songData?.duration || 0}
        onOk={handleAddNote}
        onCancel={handleAddNoteCancel}
      />
    </div>
  )
}

export default InstrumentSelect
