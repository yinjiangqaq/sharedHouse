import styled from 'styled-components';
import style from '../../assets/global-style';

export const LoginWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .LoginContainer {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 40px;
    width: 400px;
    margin: -200px 0 0 -200px;
    background: #ffffff;
    box-shadow: 0px 9px 60px 0px rgba(93, 122, 138, 0.2);
    border-radius: 8px;
    overflow: hidden;
  }

  .FormTitle {
    height: 50px;
    display: flex;
    margin-bottom: 10px;
    line-height: 50px;
    font-size: 22px;
    color: #333;
    justify-content: center;
  }
  .login-form-button {
    width: 100%;
  }
  .register-button {
    color: #1890ff;
  }
`;
