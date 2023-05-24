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
  FormInput,
  FormSelect,
} from '../../components/Form';
import ImageComponentMaua from '../../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../../components/ImageComponent/LogoNoteMaua';

import { Hind } from 'next/font/google';
import {
  CircleIconGreen,
  CircleIconRed,
  SearchIcon,
} from '../../components/Icon';
import { TitleADM } from '../../components/Title';
import {
  ListItemLeft,
  ListItemRight,
  ListNumSerie,
} from '../../components/List';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

export default function PainelAdmPage() {
  return (
    <Container className={hind.className}>
      <ImageComponentNoteMaua />
      <CardGrayADM>
        <CardWhiteADM>
          <FormContainer>
            <ContainerRowADM>
              <FormInput placeholder="Número de série"></FormInput>
              <FormButtonADM type="submit">Confirmar devolução</FormButtonADM>
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
    </Container>
  );
}
