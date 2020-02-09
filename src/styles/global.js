import { createGlobalStyle } from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');
*{
    margin : 0;
    padding : 0;
    outline : 0;
    box-sizing : border-box;
}
html,body,#root{
   height : 100%;
}
body{
  font-size : 14px;
  background  : #7159c1;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased !important;
}
body,input,button{
    font-family: Roboto, sans-serif;
    color : #222;
    font-size : 14px;
}
button{
    cursor: pointer; 
}
`;
