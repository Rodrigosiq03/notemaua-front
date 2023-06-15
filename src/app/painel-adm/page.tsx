'use client';

import { CardADM, CardGrayADM, CardWhiteADM } from '../../components/Card';
import {
  Container,
  ContainerRow,
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
  ReturnIcon,
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
import React, { useContext, useEffect } from 'react';
import DialogComponentDevolution from '../../components/DialogMUI/DialogDevolution';
import DialogComponentChangeEmail from '../../components/DialogMUI/DialogChangeEmailADM';

import { IconButton } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import { DialogText } from '../../components/Dialog';
import { NotebookContext } from '@/contexts/notebook_provider';
import { UserContext } from '@/contexts/user_provider';
import { WithdrawJson } from '@/@clean/shared/domain/entities/withdraw';
import { ReturnLink } from '@/components/Link';
import { WithdrawContext } from '@/contexts/withdraw_provider';

export interface IFormDevolution {
  numSerie: string;
}

export interface IFormFilteredNotebooks {
  search: string;
  filterBy: string;
}

export default function PainelAdmPage() {
  const {
    register: registerDevolution,
    handleSubmit: handleSubmitDevolution,
    setError: setErrorDevolution,
    formState: { errors: errorsDevolution },
  } = useForm<IFormDevolution>();

  const {
    register: registerFilteredNotebooks,
    handleSubmit: handleSubmitFilteredNotebooks,
    setError: setErrorFilteredNotebooks,
    formState: { errors: errorsFilteredNotebooks },
  } = useForm<IFormFilteredNotebooks>();
  const router = useRouter();

  const { validateNumSerieInJson, getAllNotebooks } =
    useContext(NotebookContext);
  const { getIdToken, getNameFromJson, logOut } = useContext(UserContext);
  const { finishWithdraw } = useContext(WithdrawContext);

  const [filterBy, setFilterBy] = React.useState('');
  const [search, setSearch] = React.useState('');

  const [notebooks, setNotebooks] = React.useState<any>([]);

  // properties of dialog to show th devolution
  const [numSerie, setNumSerie] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [withdrawTime, setWithdrawTime] = React.useState(0);
  const [finishTime, setFinishTime] = React.useState(0);
  const [ra, setRa] = React.useState('');

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

  const onChangeHandlerFilterBy = (event: any) => {
    setFilterBy(event.target.value);
  };

  const onSubmitDevolution: SubmitHandler<IFormDevolution> = async (data) => {
    const { numSerie } = data;
    setNumSerie(numSerie);
    const idToken = await getIdToken();
    if (!idToken) return;
    const withdrawFinished = await finishWithdraw(numSerie, idToken);
    if (withdrawFinished) {
      setEmail(withdrawFinished.email);
      const email = withdrawFinished.email;
      const ra = email.split('@')[0];
      setRa(ra);
      const name = getNameFromJson(ra);
      if (!name) return;
      setName(name);
      if (withdrawFinished.finishTime === null) return;
      setFinishTime(withdrawFinished.finishTime);
      if (withdrawFinished.withdrawTime === null) return;
      setWithdrawTime(withdrawFinished.withdrawTime);
    }

    handleClickOpenDialogDevolution();
  };

  const onSubmitFilteredNotebooks: SubmitHandler<IFormFilteredNotebooks> = (
    data,
    event
  ) => {};

  const handleLogout = async () => {
    const response = await logOut();
    if (response !== undefined || response !== null) {
      router.push('/');
    }
  };

  function convertTimestampToHoursMinutes(timestamp: string | number): string {
    if (typeof timestamp === 'string') {
      const date = new Date(parseInt(timestamp));
      const hours = date.getHours();
      const minutes = date.getMinutes();
      // Adiciona um zero à esquerda se os minutos forem menores que 10
      const formattedMinutes =
        minutes < 10 ? `0${minutes}` : minutes.toString();
      return `${hours}:${formattedMinutes}`;
    } else if (typeof timestamp === 'number' && timestamp > 0.0) {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      // Adiciona um zero à esquerda se os minutos forem menores que 10
      const formattedMinutes =
        minutes < 10 ? `0${minutes}` : minutes.toString();
      return `${hours}:${formattedMinutes}`;
    }
    return '';
  }

  let poolingTimeout: NodeJS.Timeout;
  async function loadNotebooks() {
    const idToken = await getIdToken();
    if (!idToken) {
      return;
    }
    const notebooks = await getAllNotebooks(idToken);
    if (notebooks) {
      setNotebooks(notebooks);
    }

    poolingTimeout = setTimeout(() => {
      loadNotebooks();
    }, 1000);
  }

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
    loadNotebooks();

    return () => {
      clearTimeout(poolingTimeout);
    };
  }, [router]);

  return (
    <Container className={hind.className}>
      <ImageComponentNoteMaua />
      <CardGrayADM>
        <CardWhiteADM>
          <FormContainer onSubmit={handleSubmitDevolution(onSubmitDevolution)}>
            <ContainerRowADM>
              <ContainerRow
                style={{ paddingLeft: '20px', marginBottom: '32px' }}
              >
                <ReturnLink onClick={handleLogout} href="#">
                  Sair
                </ReturnLink>
                <ReturnIcon />
              </ContainerRow>
              <div
                style={{
                  paddingTop: '20px',
                }}
              >
                <FormInput
                  type="text"
                  disableUnderline={true}
                  placeholder="Número de série"
                  {...registerDevolution('numSerie', {
                    required: 'Campo obrigatório',
                    validate: (value) => validateNumSerieInJson(value),
                    minLength: {
                      value: 5,
                      message: 'Número de série invalido!',
                    },
                    maxLength: {
                      value: 5,
                      message: 'Número de série invalido!',
                    },
                  })}
                ></FormInput>
                <FormButtonADM type="submit">Confirmar devolução</FormButtonADM>
              </div>
              <IconButton
                sx={{ marginLeft: '12px', marginBottom: '12px' }}
                onClick={handleClickOpenDialogChangeEmail}
              >
                <PersonIconADM />
              </IconButton>
            </ContainerRowADM>
            {errorsDevolution.numSerie &&
              errorsDevolution.numSerie?.type === 'required' && (
                <span
                  style={{
                    color: 'red',
                    textAlign: 'center',
                  }}
                >
                  Campo obrigatório
                </span>
              )}
            {errorsDevolution.numSerie &&
              errorsDevolution.numSerie?.type === 'validate' && (
                <span
                  style={{
                    color: 'red',
                    textAlign: 'center',
                  }}
                >
                  Número de série invalido!
                </span>
              )}
            {errorsDevolution.numSerie &&
              errorsDevolution.numSerie?.type === 'minLength' && (
                <span
                  style={{
                    color: 'red',
                    textAlign: 'center',
                  }}
                >
                  {errorsDevolution.numSerie.message}
                </span>
              )}
            {errorsDevolution.numSerie &&
              errorsDevolution.numSerie?.type === 'maxLength' && (
                <span
                  style={{
                    color: 'red',
                    textAlign: 'center',
                  }}
                >
                  {errorsDevolution.numSerie.message}
                </span>
              )}
          </FormContainer>
          <CardADM>
            <hr
              style={{
                marginLeft: '20px',
                marginRight: '20px',
                borderColor: 'd6d6d6',
              }}
            />
            <FormContainer
              onSubmit={handleSubmitFilteredNotebooks(
                onSubmitFilteredNotebooks
              )}
            >
              <ContainerRowADM2>
                <FormInput
                  type="text"
                  disableUnderline={true}
                  placeholder="Pesquisar"
                  style={{
                    marginLeft: '20px',
                    width: '160px',
                    height: '30px',
                    marginBottom: '15px',
                  }}
                  {...registerFilteredNotebooks('search', {
                    required: 'Campo obrigatório',
                  })}
                ></FormInput>
                <FormSelect
                  value={filterBy}
                  {...registerFilteredNotebooks('filterBy')}
                  onChange={onChangeHandlerFilterBy}
                >
                  <option value="">-- Filtrar por --</option>
                  <option value="RA">RA</option>
                  <option value="Número de série">Número de série</option>
                </FormSelect>
                <FormButtonSearch type="submit">
                  <SearchIcon />
                </FormButtonSearch>
              </ContainerRowADM2>
            </FormContainer>
            <TitleADM style={{ paddingLeft: '50px' }}>Número de Série</TitleADM>
            <TitleADM style={{ paddingLeft: '270px' }}>Estado</TitleADM>
            <TitleADM>Horário de Retirada</TitleADM>
            <TitleADM style={{ paddingLeft: '226px' }}>RA do Aluno</TitleADM>
            <TitleADM style={{ paddingLeft: '305px' }}>Nome do Aluno</TitleADM>
            <hr
              style={{
                marginLeft: '20px',
                marginRight: '20px',
                borderColor: 'd6d6d6',
                marginTop: '0px',
              }}
            />
            <ListNumSerie>
              {notebooks
                .filter((notebook: any) => notebook.notebook.isActive)
                .map((notebook: any, index: number) => (
                  <div
                    key={index}
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <ListItemLeft>{notebook.notebook.num_serie}</ListItemLeft>
                    {notebook.notebook.isActive ? (
                      <ListItemRight>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <CircleIconGreen />
                          <div style={{ paddingLeft: '4px' }}>Ativo</div>
                        </div>
                        {notebook.withdraws.length > 0 ? (
                          <>
                            {notebook.withdraws.map(
                              (
                                withdraw: WithdrawJson,
                                withdrawIndex: number
                              ) => (
                                <>
                                  <div key={withdrawIndex}>
                                    {convertTimestampToHoursMinutes(
                                      withdraw.withdraw_time
                                    )}
                                  </div>
                                  <div key={withdrawIndex}>
                                    {withdraw.email.split('@')[0]}
                                  </div>
                                  <div key={withdrawIndex}>
                                    {getNameFromJson(
                                      withdraw.email.split('@')[0]
                                    )}
                                  </div>
                                </>
                              )
                            )}
                          </>
                        ) : (
                          <div>No withdraws available</div>
                        )}
                      </ListItemRight>
                    ) : (
                      <ListItemRight>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <CircleIconRed />
                          <div style={{ paddingLeft: '4px' }}>Inativo</div>
                        </div>
                      </ListItemRight>
                    )}
                  </div>
                ))}
              {notebooks
                .filter((notebook: any) => !notebook.notebook.isActive)
                .map((notebook: any, index: number) => (
                  <div
                    key={index}
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <ListItemLeft>{notebook.notebook.num_serie}</ListItemLeft>
                    <ListItemRight>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <CircleIconRed />
                        <div style={{ paddingLeft: '4px' }}>Inativo</div>
                      </div>
                    </ListItemRight>
                  </div>
                ))}
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
            Número de Série: {numSerie}
          </DialogText>
          <DialogText>
            Horário de Retirada:{' '}
            <strong>{convertTimestampToHoursMinutes(withdrawTime)}</strong>
          </DialogText>
          <DialogText>
            Horário de Devolução:{' '}
            <strong>{convertTimestampToHoursMinutes(finishTime)}</strong>
          </DialogText>
          <hr style={{ marginTop: '25px' }}></hr>
          <DialogText style={{ fontWeight: '700', fontSize: '25px' }}>
            {name}
          </DialogText>
          <DialogText>{email}</DialogText>
          <DialogText>
            RA:<strong> {ra}</strong>
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
