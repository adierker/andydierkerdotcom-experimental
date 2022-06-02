import { ReactElement } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { Animal, Breed } from 'types'

interface AnimalCardProps {
  animal: Animal
}

export const AnimalCard = ({
  animal: {
    id,
    url,
    type,
    breeds,
    age,
    gender,
    description,
    animalName,
    photos,
  },
}: AnimalCardProps): ReactElement => {
  const { primary, secondary, mixed, unknown }: Breed = breeds
  if (photos[0] === undefined) {
    return null
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
    >
      <CardMedia
        component="img"
        alt={animalName}
        height="100"
        image={photos[0].large}
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
