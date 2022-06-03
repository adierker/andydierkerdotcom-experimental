import { ReactElement } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useRouter, NextRouter } from 'next/router'

import { Animal, Breed } from 'types'

interface AnimalCardProps {
  animal: Animal
  oauthToken: string
}

export const AnimalCard = ({
  animal: {
    id,
    // url,
    // type,
    breeds,
    age,
    // gender,
    // description,
    animalName,
    photos,
  },
  oauthToken,
}: AnimalCardProps): ReactElement => {
  const router: NextRouter = useRouter()

  const { primary }: Breed = breeds
  const dogPhoto =
    photos[0] === undefined ? '/dog-placeholder.jpg' : photos[0].large

  const goToDogDetails = () => {
    router.push({
      pathname: `/interviewprep/dog/${id}`,
      query: { token: oauthToken },
    })
  }

  return (
    <Card
      sx={{
        width: '300px',
        height: '300px',
        marginLeft: '12px',
        marginRight: '12px',
        marginBottom: '12px',
      }}
      onClick={goToDogDetails}
    >
      <CardMedia
        component="img"
        alt={animalName}
        height="100"
        image={dogPhoto}
        sx={{ height: '200px' }}
      />
      <CardContent>
        <Typography sx={{ fontSize: 24 }}>{animalName}</Typography>
        <Typography sx={{ fontSize: 12 }}>
          {age}, {primary}
        </Typography>
      </CardContent>
    </Card>
  )
}
