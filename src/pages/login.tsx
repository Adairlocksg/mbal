import LoadingButton from "@/components/ui/base/loading-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setToken } from "@/helpers/token-helper";
import { AxiosCustomResponse } from "@/types/Axios";
import axios from "axios";
import { LogInIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const Login = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const dto = {
      userName,
      password,
    };

    try {
      const token = await axios.post<typeof dto, AxiosCustomResponse<string>>(
        "/login",
        dto
      );

      setToken(token.data);
      window.location.reload();
    } catch (error) {
      const err = axios.isAxiosError(error) ? error.response?.data : error;

      toast.error(`Erro ao fazer login: ${err ?? "Erro desconhecido"}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Usuário
              </label>
              <Input
                id="usuario"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Digite seu usuário"
                required
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                className="mt-1 block w-full"
              />
            </div>

            <LoadingButton
              loading={loading}
              icon={<LogInIcon className="h-4 w-4 ml-2" />}
              type="submit"
              className="w-full"
            >
              Entrar
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
