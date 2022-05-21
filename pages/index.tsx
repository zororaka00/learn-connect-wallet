import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Torus from "@toruslabs/torus-embed"

const logoBinance = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNTZweCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgd2lkdGg9IjI1NnB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iQ2xhc3NpYyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPjxnIGZpbGw9IiNGM0JBMkYiIGlkPSJCaW5hbmNlLUNvaW4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNTcwLjAwMDAwMCwgLTI0ODguMDAwMDAwKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTU3MC4wMDAwMDAsIDI0ODguMDAwMDAwKSI+PHBvbHlnb24gaWQ9IkZpbGwtMyIgcG9pbnRzPSI4LjMwOTEyMTUzIDE0Ny43MjEwMTMgNDguNDI5MTA5MyAxNDcuNzIxMDEzIDQ4LjQyOTEwOTMgMTA3LjYwMTAyNSA4LjMwOTEyMTUzIDEwNy42MDEwMjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI4LjM2OTExNSwgMTI3LjY2MTAxOSkgcm90YXRlKC00NS4wMDAwMDApIHRyYW5zbGF0ZSgtMjguMzY5MTE1LCAtMTI3LjY2MTAxOSkgIi8+PHBvbHlnb24gaWQ9IkZpbGwtMyIgcG9pbnRzPSIyMDYuODkyOTI5IDE0Ny43MjEwMTMgMjQ3LjAxMjkxNyAxNDcuNzIxMDEzIDI0Ny4wMTI5MTcgMTA3LjYwMTAyNSAyMDYuODkyOTI5IDEwNy42MDEwMjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNi45NTI5MjMsIDEyNy42NjEwMTkpIHJvdGF0ZSgtNDUuMDAwMDAwKSB0cmFuc2xhdGUoLTIyNi45NTI5MjMsIC0xMjcuNjYxMDE5KSAiLz48cG9seWdvbiBpZD0iRmlsbC0zIiBwb2ludHM9IjEwNy42MDEwMjUgMTQ3LjcyMTAxMyAxNDcuNzIxMDEzIDE0Ny43MjEwMTMgMTQ3LjcyMTAxMyAxMDcuNjAxMDI1IDEwNy42MDEwMjUgMTA3LjYwMTAyNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTI3LjY2MTAxOSwgMTI3LjY2MTAxOSkgcm90YXRlKC00NS4wMDAwMDApIHRyYW5zbGF0ZSgtMTI3LjY2MTAxOSwgLTEyNy42NjEwMTkpICIvPjxwYXRoIGQ9Ik0xODIuODI2MDAyLDQyLjkxMDA3ODEgTDE4Mi44MjYwMDIsMjIuODUwMDg0MiBMNzIuNDk2MDM2MiwyMi44NTAwODQyIEw3Mi40OTYwMzYyLDYyLjk3MDA3MiBMMTQyLjcwNjAxNSw2Mi45NzAwNzIgTDE0Mi43MDYwMTUsMTMzLjE4MDA1MSBMMTgyLjgyNjAwMiwxMzMuMTgwMDUxIEwxODIuODI2MDAyLDQyLjkxMDA3ODEgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjcuNjYxMDE5LCA3OC4wMTUwNjcpIHJvdGF0ZSgtNDUuMDAwMDAwKSB0cmFuc2xhdGUoLTEyNy42NjEwMTksIC03OC4wMTUwNjcpICIvPjxwYXRoIGQ9Ik0xODIuODI2MDAyLDE0Mi4yMDE5ODIgTDE4Mi44MjYwMDIsMTIyLjE0MTk4OCBMNzIuNDk2MDM2MiwxMjIuMTQxOTg4IEw3Mi40OTYwMzYyLDE2Mi4yNjE5NzYgTDE0Mi43MDYwMTUsMTYyLjI2MTk3NiBMMTQyLjcwNjAxNSwyMzIuNDcxOTU0IEwxODIuODI2MDAyLDIzMi40NzE5NTQgTDE4Mi44MjYwMDIsMTQyLjIwMTk4MiBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNy42NjEwMTksIDE3Ny4zMDY5NzEpIHJvdGF0ZSgtMjI1LjAwMDAwMCkgdHJhbnNsYXRlKC0xMjcuNjYxMDE5LCAtMTc3LjMwNjk3MSkgIi8+PC9nPjwvZz48L2c+PC9zdmc+'

const Home: NextPage = () => {
  const login = async () => {
    try {
      const customBinanceProviderOption = {
        'custom-binance': {
          display: {
            logo: logoBinance,
            name: 'Binance Chain Wallet',
            description: 'Connect to your Binance Chain Wallet account',
          },
          package: true,
          options: {},
          connector: async (ProviderPackage, options) => {
            let provider = null
            if (typeof window.BinanceChain !== 'undefined') {
              provider = window.BinanceChain
              try {
                await provider.request({ method: 'eth_requestAccounts' })
              } catch (error) {
                throw new Error('User Rejected')
              }
            } else {
              window.open("https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp", "_blank")
              throw new Error('No Web3 Provider found')
            }
            return provider
          },
        },
      }
      

      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              56: 'https://bsc-dataseed1.defibit.io',
            },
            network: 'binance',
          },
        },
        torus: {
          package: Torus, // required
          options: {
            networkParams: {
              host: "https://bsc-dataseed1.defibit.io", // optional
              chainId: 56, // optional
              networkId: 56 // optional
            }
          }
        },
        ...customBinanceProviderOption,
      }

      const web3Modal = new Web3Modal({
        // optional
        cacheProvider: true,
        providerOptions,
        theme: "dark"
      })
      await web3Modal.clearCachedProvider()
      const web3provider = await web3Modal.connect()
      const web3: Web3 = new Web3(web3provider)
      const chainId = await web3.eth.getChainId()
      const address = web3.currentProvider.selectedAddress
      const balance = web3.utils.fromWei(await web3.eth.getBalance(address), 'ether') + ' BNB'
      const varreturn = { web3provider, chainId, address, balance }
      console.log('connect: ', varreturn)
      return varreturn
    } catch (err) {
      throw err
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Learn Connect Wallet</title>
        <meta name="description" content="Generated by Learn Connect Wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Learn Connect Wallet
        </h1>

        <button className={styles.card} onClick={login}>LOGIN</button>
      </main>
    </div>
  )
}

export default Home
