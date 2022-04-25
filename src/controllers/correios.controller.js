import soap from "soap";
import axios from "axios";
import { toJSON } from "../utils/xml.utils.js";

export const getSoap = async (req, res) => {
  const { cep } = req.params;

  const url = process.env.CORREIOS_WS_URL;

  const method = "consultaCEP";

  const args = {
    cep: cep,
  };

  try {
    const { return: result } = await new Promise((resolve, reject) => {
      soap.createClient(url, (err, client) => {
        if (err) return reject(err);

        client[method](args, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });

    return res.send(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getAxios = async (req, res) => {
  const { cep } = req.params;

  const url = process.env.CORREIOS_WS_URL;

  try {
    const xml = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">
        <soapenv:Header/>
        <soapenv:Body>
            <cli:consultaCEP>
              <!--Optional:-->
              <cep>${cep}</cep>
            </cli:consultaCEP>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    const { data } = await axios({
      method: "post",
      url,
      data: xml,
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
      },
    });

    const object = await toJSON(data, ["consultaCEPResponse", "return"]);

    return res.send(object);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
