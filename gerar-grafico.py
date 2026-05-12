import pandas as pd
import plotly.graph_objects as go

# Dados extraídos do Boletim SE 16
semanas = list(range(1, 17))
# Valores aproximados baseados nas médias do boletim (Total 636 em 2026 vs ~1742 em 2025)
dados_2025 = [80, 95, 110, 130, 150, 140, 160, 180, 170, 150, 130, 110, 90, 80, 70, 67]
dados_2026 = [40, 42, 45, 50, 55, 52, 48, 45, 43, 40, 38, 35, 32, 30, 28, 23]

df = pd.DataFrame({
    'Semana': semanas,
    '2025 (Anterior)': dados_2025,
    '2026 (Atual)': dados_2026
})

# Criando o gráfico Premium
fig = go.Figure()

# Linha 2025 (Fina e Cinza - Referência)
fig.add_trace(go.Scatter(
    x=df['Semana'], y=df['2025 (Anterior)'],
    name='2025',
    line=dict(color='rgba(255, 255, 255, 0.2)', width=2, dash='dot'),
    hovertemplate='Ano 2025: %{y} casos'
))

# Linha 2026 (Grossa e Neon - Destaque)
fig.add_trace(go.Scatter(
    x=df['Semana'], y=df['2026 (Atual)'],
    name='2026',
    line=dict(color='#d4ff00', width=5),
    fill='tozeroy',
    fillcolor='rgba(212, 255, 0, 0.1)',
    hovertemplate='Ano 2026: %{y} casos'
))

# Ajustando o Layout para Celular
fig.update_layout(
    template="plotly_dark",
    paper_bgcolor='rgba(0,0,0,0)', # Fundo transparente para combinar com o app
    plot_bgcolor='rgba(0,0,0,0)',
    margin=dict(l=10, r=10, t=40, b=10),
    height=300,
    showlegend=False,
    title=dict(
        text="NOTIFICAÇÕES: 2025 vs 2026",
        x=0.5, font=dict(color='#d4ff00', size=14)
    ),
    xaxis=dict(showgrid=False, title="Semana Epidemiológica"),
    yaxis=dict(showgrid=True, gridcolor='rgba(255,255,255,0.1)', title="Casos")
)

# Exporta para HTML
fig.write_html("grafico_dengue.html", config={'displayModeBar': False})
print("Sucesso! O arquivo 'grafico_dengue.html' foi gerado.")