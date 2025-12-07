import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Col, Row, Select, Typography } from 'antd'
import React from 'react'
import { useInstruments } from '../../hooks/useInstruments';
import type { Instrument, Track } from '../../types/api';
import { useParams } from 'react-router-dom';
import { useCreateTrack, useDeleteTrack } from '../../hooks/useTracks';
import { useSong } from '../../hooks/useSongs';

const InstrumentSelect: React.FC = () => {
  const { id: currentSongId } = useParams();
  const { data: songData } = useSong(currentSongId || '');
  const { tracks } = songData || {};
  const selectedInstrumentIds = tracks?.map((track: Track) => track.instrument?.id) || [];
  const { mutate: createTrack } = useCreateTrack(currentSongId || '');
  const { mutate: deleteTrack } = useDeleteTrack(currentSongId || '');
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
          <Button icon={<PlusCircleFilled />} type="primary" onClick={() => { }}>Add Note</Button>
        </Col>
      </Row>
    </div>
  )
}

export default InstrumentSelect
