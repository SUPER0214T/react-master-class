import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  border-radius: 15px;
  margin-bottom: 10px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  a {
    padding: 20px;
    color: ${(props) => props.theme.bgColor};
    transition: color 0.2s ease-in-out;
    display: flex;
    align-items: center;

    img {
      margin-right: 8px;
    }
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
`;

interface ICoins {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active:boolean,
  type: string,
}

function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('https://api.coinpaprika.com/v1/coins');
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })()
  // }, [])

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {
        isLoading ? (<Loader>Loading...</Loader>)
        : (
          <CoinList>
            {
              data?.slice(0, 100).map((coin) => {
                return (
                  <Coin key={coin.id}>
                    <Link 
                      to={{
                      pathname: `/${coin.id}`,
                      state: { name: coin.name },
                    }}>
                      <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`} />
                      {coin.name} &rarr;
                    </Link>
                  </Coin>
                )
              })
            }
          </CoinList>
        )
      }
    </Container>
  )
}

export default Coins;