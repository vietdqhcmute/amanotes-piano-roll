import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useTags } from '../hooks/useTags';
import type { Tag } from '../types/api';

interface onSubmitProps {
  name: string;
  description: string;
  duration: number;
  bpm?: number;
  tags?: number[];
}
interface CreateSongModalProps {
  open: boolean;
  onOk: (values: onSubmitProps) => void;
  onCancel: () => void;
}

const CreateSongModal: React.FC<CreateSongModalProps> = ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const { data } = useTags();

  const tagOptions = data?.map((tag: Tag) => ({
    label: tag.label,
    value: tag.id
  })) || [];

  const handleOk = () => {
    form.validateFields().then(values => {
      onOk(values);
      form.resetFields();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Create New Song"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Song Name"
          rules={[{ required: true, message: 'Please input the song name!' }]}
        >
          <Input placeholder="Enter song name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea
            placeholder="Enter song description"
            rows={3}
          />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration (seconds)"
          rules={[{ required: true, message: 'Please input the duration!' }]}
        >
          <Input
            type="number"
            placeholder="Enter duration in seconds"
            min={1}
          />
        </Form.Item>

        <Form.Item
          name="bpm"
          label="BPM (Beats Per Minute)"
        >
          <Input
            type="number"
            placeholder="Enter BPM"
            defaultValue={120}
            min={1}
          />
        </Form.Item>

        <Form.Item
          name="tags"
          label="Tags"
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            options={tagOptions}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSongModal;
