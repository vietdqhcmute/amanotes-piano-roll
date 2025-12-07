import React from 'react';
import { Modal, Form, Select, InputNumber, Input, Button } from 'antd';
import type { Track, CreateNoteData } from '../types/api';

const { Option } = Select;
const { TextArea } = Input;

export interface AddNoteModalProps {
  open: boolean;
  tracks: Track[];
  songDuration: number;
  onOk: (values: CreateNoteData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  open,
  tracks,
  songDuration,
  onOk,
  onCancel,
  loading = false,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Add New Note"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Add Note
        </Button>,
      ]}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="trackId"
          label="Track"
          rules={[{ required: true, message: 'Please select a track' }]}
        >
          <Select placeholder="Select track">
            {tracks.map(track => (
              <Option key={track.id} value={track.id}>
                {track.instrument?.label || `Track ${track.id}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="time"
          label="Time (seconds)"
          rules={[
            { required: true, message: 'Please enter time' },
            { type: 'number', min: 0, message: 'Time must be at least 0' },
            { type: 'number', max: songDuration, message: `Time cannot exceed song duration (${songDuration}s)` }
          ]}
        >
          <InputNumber
            placeholder="Enter time in seconds"
            min={0}
            max={songDuration}
            step={0.1}
            precision={1}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea
            placeholder="Enter note description (optional)"
            rows={3}
            showCount
            maxLength={200}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNoteModal;
