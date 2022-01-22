import { useRouter } from 'next/router';
const Details = () => {
    const router = useRouter();
    const { idSastanka } = router.query;

    return <div>{idSastanka}</div>;
};

export default Details;
