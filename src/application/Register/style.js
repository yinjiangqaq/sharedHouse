import styled from 'styled-components';

export const RegisterWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100%;
  .RegisterContainer {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    padding: 40px;
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
  .registerButton {
    width: 100%;
  }
  .verifyCodeButton {
    position: absolute;
    right: 6px;
    line-height: 14px;
    top: 50%;
    transform: translate(0, -50%);
    padding: 7px 8px;
    border-radius: 4px;
    border: 1px solid #1966ff;
    font-size: 14px;
    background-color: #f5f5fa;
    color: #1966ff;
    cursor: pointer;
    text-align: center;
  }
  .verifyCodeButton:hover,
  .verifyCodeButton:focus {
    background: #fff;
    border-color: #4785ff;
    color: #4785ff;
  }

  .verifyCodeButton:active {
    color: #1966ff;
    background-color: #f5f5fa;
  }

  .verifyCodeButton:visited {
    color: #1966ff;
    background-color: #f5f5fa;
  }
  .verifyCodeButton:disabled {
    color: rgba(0, 0, 0, 0.25);
    background: #f5f5f5;
    border-color: #d9d9d9;
    text-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`;
