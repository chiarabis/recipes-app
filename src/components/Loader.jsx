import styled from "styled-components"

export default function Loader() {
  return (
    <LoaderContainer>
        <Pizza/>
    </LoaderContainer>
  )
}

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 6rem;
`

const Pizza = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 8px solid #d1914b;
    box-sizing: border-box;
    --c:no-repeat radial-gradient(farthest-side, #d64123 94%,#0000);
    --b:no-repeat radial-gradient(farthest-side, #000 94%,#0000);
    background:
        var(--c) 11px 24px,
        var(--b) 30px 35px,
        var(--c) 40px 26px,
        var(--b) 29px 16px,
        var(--c) 23px 48px,
        var(--b) 13px 52px,
        var(--c) 48px 8px,
        var(--b) 60px 35px,
        var(--c) 54px 48px,
        var(--b) 44px 65px,
        #F6D354;
    background-size: 15px 15px,6px 6px;
    animation: l4 3s infinite;

    @keyframes l4 {
    0%     {-webkit-mask:conic-gradient(#0000 0     ,#000 0)}
    16.67% {-webkit-mask:conic-gradient(#0000 60deg ,#000 0)}
    33.33% {-webkit-mask:conic-gradient(#0000 120deg,#000 0)}
    50%    {-webkit-mask:conic-gradient(#0000 180deg,#000 0)}
    66.67% {-webkit-mask:conic-gradient(#0000 240deg,#000 0)}
    83.33% {-webkit-mask:conic-gradient(#0000 300deg,#000 0)}
    100%   {-webkit-mask:conic-gradient(#0000 360deg,#000 0)}
    }
`
