'use client';

import { CardADM, CardGrayADM, CardWhiteADM } from '../../components/Card';
import {
  Container,
  ContainerRowADM,
  ContainerRowADM2,
} from '../../components/Container';
import {
  FormButtonADM,
  FormButtonSearch,
  FormContainer,
  FormContainerADM,
  FormInput,
  FormSelect,
} from '../../components/Form';
import ImageComponentMaua from '../../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../../components/ImageComponent/LogoNoteMaua';

import { Hind } from 'next/font/google';
import {
  CircleIconGreen,
  CircleIconRed,
  PersonIconADM,
  SearchIcon,
} from '../../components/Icon';
import { TitleADM } from '../../components/Title';
import {
  ListItemLeft,
  ListItemRight,
  ListNumSerie,
} from '../../components/List';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });
import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import DialogComponentDevolution from '../../components/DialogMUI/DialogDevolution';
import DialogComponentChangeEmail from '../../components/DialogMUI/DialogChangeEmailADM';

import { IconButton } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import { DialogText } from '../../components/Dialog';

export interface IFormDevolution {
  numSerie: string;
}

export default function PainelAdmPage() {
  const { handleSubmit } = useForm<IFormDevolution>();
  const router = useRouter();

  const [openDialogDevolution, setOpenDialogDevolution] = React.useState(false);
  const [openDialogChangeEmail, setOpenDialogChangeEmail] =
    React.useState(false);

  const handleClickOpenDialogDevolution = () => {
    setOpenDialogDevolution(true);
  };
  const handleCloseDialogDevolution = () => {
    setOpenDialogDevolution(false);
  };

  const handleClickOpenDialogChangeEmail = () => {
    setOpenDialogChangeEmail(true);
  };

  const handleCloseDialogChangeEmail = () => {
    setOpenDialogChangeEmail(false);
  };

  const onSubmitDevolution: SubmitHandler<IFormDevolution> = (data) => {
    handleClickOpenDialogDevolution();
  };

  useEffect(() => {
    const response = Auth.currentAuthenticatedUser();
    response
      .then((user) => {
        const customAttributes = user.attributes['custom:role'];
        if (customAttributes === 'STUDENT') {
          router.push('/');
        }
        if (customAttributes === 'EMPLOYEE') {
          return;
        }
      })
      .catch((error) => {
        router.push('/');
      });
  }, [router]);

  return (
    <Container className={hind.className}>
      <ImageComponentNoteMaua />
      <CardGrayADM>
        <CardWhiteADM>
          <FormContainer onSubmit={handleSubmit(onSubmitDevolution)}>
            <ContainerRowADM>
              <FormContainerADM onSubmit={handleClickOpenDialogDevolution}>
                <FormInput
                  disableUnderline={true}
                  placeholder="Número de série"
                ></FormInput>
                <FormButtonADM type="submit">Confirmar devolução</FormButtonADM>
                <IconButton
                  sx={{ marginLeft: '612px' }}
                  onClick={handleClickOpenDialogChangeEmail}
                >
                  <PersonIconADM />
                </IconButton>
              </FormContainerADM>
            </ContainerRowADM>
            <CardADM>
              <hr
                style={{
                  marginLeft: '20px',
                  marginRight: '20px',
                  borderColor: 'd6d6d6',
                }}
              />
              <ContainerRowADM2>
                <FormInput
                  disableUnderline={true}
                  placeholder="Pesquisar"
                  style={{
                    marginLeft: '20px',
                    width: '160px',
                    height: '30px',
                    marginBottom: '15px',
                  }}
                ></FormInput>
                <FormSelect>
                  <option>RA</option>
                  <option>Número de série</option>
                </FormSelect>
                <FormButtonSearch type="submit">
                  <SearchIcon />
                </FormButtonSearch>
              </ContainerRowADM2>
              <TitleADM style={{ paddingLeft: '50px' }}>
                Número de Série
              </TitleADM>
              <TitleADM style={{ paddingLeft: '270px' }}>Estado</TitleADM>
              <TitleADM>Horário de Retirada</TitleADM>
              <TitleADM style={{ paddingLeft: '226px' }}>RA do Aluno</TitleADM>
              <TitleADM style={{ paddingLeft: '305px' }}>
                Nome do Aluno
              </TitleADM>
              <hr
                style={{
                  marginLeft: '20px',
                  marginRight: '20px',
                  borderColor: 'd6d6d6',
                  marginTop: '0px',
                }}
              />
              <ListNumSerie>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconGreen />
                      <div style={{ paddingLeft: '4px' }}>Ativo</div>
                    </div>
                    <div>7:40</div>
                    <div>22.01049-0</div>
                    <div>Vitor Moretti Negresiolo</div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconGreen />
                      <div style={{ paddingLeft: '4px' }}>Ativo</div>
                    </div>
                    <div>9:00</div>
                    <div>22.01049-0</div>
                    <div>Vitor Moretti Negresiolo</div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItemLeft>38029</ListItemLeft>
                  <ListItemRight>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CircleIconRed />
                      <div style={{ paddingLeft: '4px' }}>Inativo</div>
                    </div>
                  </ListItemRight>
                </div>
              </ListNumSerie>
            </CardADM>
          </FormContainer>
        </CardWhiteADM>
      </CardGrayADM>
      <ImageComponentMaua style={{ paddingTop: '18px' }} />
      <DialogComponentDevolution
        open={openDialogDevolution}
        handleClose={handleCloseDialogDevolution}
      >
        <div>
          <hr></hr>
          <DialogText style={{ fontWeight: '700', fontSize: '25px' }}>
            Número de Série: 38029
          </DialogText>
          <DialogText>
            Horário de Retirada: <strong>7:40</strong>
          </DialogText>
          <DialogText>
            Horário de Devolução: <strong>11:20</strong>
          </DialogText>
          <hr style={{ marginTop: '25px' }}></hr>
          <DialogText style={{ fontWeight: '700', fontSize: '25px' }}>
            Luigi Guimarães Trevisan
          </DialogText>
          <DialogText>22.01102-0@maua.br</DialogText>
          <DialogText>
            RA:<strong> 22.01102-0</strong>
          </DialogText>
        </div>
      </DialogComponentDevolution>
      <DialogComponentChangeEmail
        open={openDialogChangeEmail}
        handleClose={handleCloseDialogChangeEmail}
      />
    </Container>
  );
}
