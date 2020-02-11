import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { Box, Text } from 'rebass'

import { getCover } from '../services/getCover'

interface IProps {
  id: string
}

const CoverBox = styled(Box)`
  overflow: hidden;
`

const BlurBox = styled(Box)`
  height: 747px;
  filter: blur(50px);
`

const PosterComponent: React.FC<IProps> = props => {
  const { id } = props

  const [raw, setRaw] = useState<string | null>(null)

  const fetchCover = async (id: string) => {
    const cover = await getCover(id)
    setRaw(cover)
  }

  useEffect(() => {
    fetchCover(id)
  }, [])

  return (
    <React.Fragment>
      {raw !== null ? (
        <CoverBox>
          <BlurBox
            sx={{
              backgroundImage: `url(${raw})`,
              backgroundSize: 'cover',
            }}
          />
        </CoverBox>
      ) : (
        <CoverBox>
          <BlurBox />
        </CoverBox>
      )}
      <Box backgroundColor={`#${String(id).padStart(6, '0')}`} p={4}>
        <Box py={2}>
          <Text
            fontFamily={`RM4SCC`}
            fontSize={76}
            color={`white`}
            textAlign={`center`}
            py={4}>
            {String(id).padStart(6, '0')}
          </Text>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default PosterComponent
