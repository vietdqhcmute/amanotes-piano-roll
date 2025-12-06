import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button } from 'antd';
import { useTags } from '../hooks/useTags';
import type { Song, UpdateSongData } from '../types/api';

const { TextArea } = Input;
const { Option } = Select;

export interface UpdateSongModalProps {
  open: boolean;
  song: Song | null;
  onOk: (values: UpdateSongData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const UpdateSongModal: React.FC<UpdateSongModalProps> = ({
  open,
  song,
  onOk,
  onCancel,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const { data: tags } = useTags();

  // Reset form when song changes or modal opens
  useEffect(() => {
    if (open && song) {
      form.setFieldsValue({
        name: song.name,
        description: song.description || '',
        bpm: song.bpm || undefined,
        duration: song.duration,
        tagIds: song.tags?.map(tag => tag.id) || [],
      });
    }
  }, [open, song, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
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
      title={`Update Song: ${song?.name || ''}`}
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Update Song
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
          name="name"
          label="Song Name"
          rules={[{ required: true, message: 'Please enter song name' }]}
        >
          <Input placeholder="Enter song name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea
            placeholder="Enter song description"
            rows={3}
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration (seconds)"
          rules={[{ required: true, message: 'Please enter duration' }]}
        >
          <InputNumber
            placeholder="Duration in seconds"
            min={1}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="bpm"
          label="BPM (Beats Per Minute)"
        >
          <InputNumber
            placeholder="Enter BPM"
            min={1}
            max={300}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="tagIds"
          label="Tags"
        >
          <Select
            mode="multiple"
            placeholder="Select tags"
            allowClear
            loading={!tags}
          >
            {tags?.map(tag => (
              <Option key={tag.id} value={tag.id}>
                {tag.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSongModal;
