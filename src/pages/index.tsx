/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}
export default function Home({product}: HomeProps) {
 
  return (
    <>
      <Head>
        <title> Início | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, welcome! </span>
          <h1>News about the <span> React</span> world.</h1>
          <p>Get acess to all the publications <br/>
          <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
       
        <img src="/images/avatar.svg" alt="woman coding" />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JJgyjD353wy5Zn6Gi2YROWp') 

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //Significado: 60=1minuto * 60=1h * 24h=1dia 
  }
}