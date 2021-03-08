import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Row, Col } from 'antd';
export const Container = styled.div`
  background: #fff;
`;

function caseForm(props) {
  const [form] = Form.useForm();
}

export default React.memo(caseForm);
